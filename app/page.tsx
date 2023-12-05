"use client";
import { TextArea } from "@/components/TextArea/TextArea";
import { ArrowsIcon } from "@/components/icons/ArrowsIcon";
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";
import { SpeakerIcon } from "@/components/icons/SpeakerIcon";
import { LanguageSelector } from "@/components/languageSelector/LanguageSelector";
import { AUTO_LANGUAGE } from "@/constants";
import { useStore } from "@/customHook/useStore";
import { useDebounce } from "@/customHook/useDebounce";
import s from "./Home.module.css";
import { translate } from "@/services/translateOpenAI";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    interchnageLanguages,
    fromText,
    setFromText,
    result,
    setResult,
    loading,
  } = useStore();

  const debounceText = useDebounce(fromText, 400);

  useEffect(() => {
    if (debounceText === "") return;

    translate({ fromLanguage, toLanguage, text: debounceText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult("Error");
      });
  }, [debounceText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = (type: string) => {
    const utterance = new SpeechSynthesisUtterance( type === 'from' ? fromText : result);
    utterance.lang = toLanguage;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={s.container}>
      <h1> Translate with AI</h1>

      <div className={s.translate_content}>
        <div className={s.text_container}>
          <LanguageSelector
            type="from"
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <TextArea type="from" value={fromText} onChange={setFromText} />
          <div className={s.container_icons}>
            <button onClick={() => handleSpeak('from')}>
              <SpeakerIcon />
            </button>
          </div>
        </div>

        <div style={{ marginInline: "30px" }}>
          <button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchnageLanguages}
          >
            <ArrowsIcon />
          </button>
        </div>

        <div className={s.text_container}>
          <LanguageSelector
            type="to"
            value={toLanguage}
            onChange={setToLanguage}
          />
          <TextArea
            type="to"
            loading={loading}
            value={result}
            onChange={setResult}
          />
          <div className={s.container_icons}>
            <button onClick={handleClipboard}>
              <ClipboardIcon />
            </button>
            <button onClick={() => handleSpeak('to')}>
              <SpeakerIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
