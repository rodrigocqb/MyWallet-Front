import { useTranslation } from "react-i18next";
import styled from "styled-components";

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  return (
    <LangSelect>
      <label htmlFor="language">{t("language")}</label>
      <select
        name="language"
        value={i18n.resolvedLanguage}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
        }}
      >
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </LangSelect>
  );
}

const LangSelect = styled.div`
  width: 120px;
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ffffff;
  font-weight: 700;
  select {
    outline: none;
    color: #666666;
    border: 1px solid #d5d5d5;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 5px;
    width: 120px;
    height: 30px;
    padding-left: 5px;
    font-size: 14px;
  }
`;
