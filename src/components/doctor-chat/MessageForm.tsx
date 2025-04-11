
import React from "react";
import { Send, Paperclip, Image, Smile } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

interface MessageFormProps {
  onSubmit: (message: string) => void;
}

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const { language } = useLanguage();
  
  const messageFormSchema = z.object({
    message: z.string().min(1, {
      message: translate("doctorChat", "messageTooShort", language) || "Message is required",
    }),
  });

  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof messageFormSchema>) => {
    onSubmit(values.message);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="relative">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Textarea
                    placeholder={
                      translate("doctorChat", "messagePlaceholder", language) ||
                      "Type your message here..."
                    }
                    className="pr-24 min-h-[120px] resize-none"
                    {...field}
                  />
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <Button type="button" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                      <Image className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                      <Smile className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          <Send className="h-4 w-4 mr-2" />
          {translate("doctorChat", "sendMessage", language) || "Send Message"}
        </Button>
      </form>
    </Form>
  );
};

