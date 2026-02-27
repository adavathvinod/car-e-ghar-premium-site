import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { LineItem } from "@/lib/invoice-utils";

interface AIInputProps {
  onResult: (data: { clientName?: string; clientAddress?: string; items: LineItem[] }) => void;
}

export function AIInput({ onResult }: AIInputProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("parse-invoice", {
        body: { text: text.trim() },
      });

      if (error) throw error;
      if (data?.error) {
        toast({ title: "AI Error", description: data.error, variant: "destructive" });
        return;
      }

      const items: LineItem[] = (data.items || []).map((item: any) => ({
        id: crypto.randomUUID(),
        particulars: item.particulars || "",
        amount: Number(item.amount) || 0,
      }));

      onResult({
        clientName: data.clientName || undefined,
        clientAddress: data.clientAddress || undefined,
        items,
      });
      setText("");
      toast({ title: "Invoice updated!", description: `Added ${items.length} item(s) from AI.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not supported", description: "Your browser doesn't support voice input.", variant: "destructive" });
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(prev => prev ? prev + " " + transcript : transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      toast({ title: "Voice error", description: "Could not recognize speech. Try again.", variant: "destructive" });
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Type or speak commands like: "Create invoice for Wimira Digital, GST registration 23500"
      </p>
      <div className="flex gap-2">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='e.g. "Add company incorporation 2000 and GST filing 5000"'
          rows={2}
          className="flex-1 min-h-[60px]"
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        />
        <div className="flex flex-col gap-1">
          <Button size="icon" variant={listening ? "destructive" : "outline"} onClick={toggleVoice} title="Voice input">
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button size="icon" onClick={handleSend} disabled={loading || !text.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
