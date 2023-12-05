//No publicar esto del lado del cliente, crear una api del lado del server y pegarle
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import { SUPPORTED_LANGUAGES } from "@/constants";
import { FromLanguage, Language } from "@/types";
import { Content } from "next/font/google";

const apiKey = "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";

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        "You are a AI that translate text. You recive a text from the user, Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detetct the language. The language you translate to is surrounded by `[[` and `]]`. If you couldn't detect the language to tranlate provide by `{{` and `}}`, just not translate",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "Hola mundo {{Español}} [[English]]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Hello World",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "How are you? {{auto}} [[Deutsch]]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Wie geht es dir?",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "Bon dia, com estas? {{auto}} [[Español]]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Buenos días, cómo estás?",
    },
  ];

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  });

  return completion.data.choices[0]?.message?.content;
}
