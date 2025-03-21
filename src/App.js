import React, { useState } from "react";
import "./App.css";

const translations = {
  en: {
    title: "Password Strength Checker",
    placeholder: "Enter password",
    showPassword: "Show Password",
    generate: "Generate Secure Password",
    changeLanguage: "Change Language",
    strength: {
      veryWeak: "Very Weak",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
    },
  },
  th: {
    title: "ตัวตรวจสอบความแข็งแรงของรหัสผ่าน",
    placeholder: "ใส่รหัสผ่าน",
    showPassword: "แสดงรหัสผ่าน",
    generate: "สร้างรหัสผ่านที่ปลอดภัย",
    changeLanguage: "เปลี่ยนภาษา",
    strength: {
      veryWeak: "อ่อนมาก",
      weak: "อ่อน",
      medium: "ปานกลาง",
      strong: "แข็งแรง",
    },
  },
};

const checkPasswordStrength = (password, lang) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[\W]/.test(password)) score += 1;

  let strengthLevel = "veryWeak";
  if (score === 4) strengthLevel = "strong";
  else if (score === 3) strengthLevel = "medium";
  else if (score === 2) strengthLevel = "weak";

  return { strength: translations[lang].strength[strengthLevel], level: strengthLevel };
};

const generateSecurePassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ strength: "", level: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword, language));
  };

  const handleGenerate = () => {
    const newPassword = generateSecurePassword();
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword, language));
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en");
    setStrength(checkPasswordStrength(password, language === "en" ? "th" : "en"));
  };

  return (
    <div className="container">
      <h2>{translations[language].title}</h2>
      <div className="input-container">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          placeholder={translations[language].placeholder}
        />
        <i
          className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} show-password-icon`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
      <p className={strength.level}>{strength.strength}</p>
      {(strength.level === "weak" || strength.level === "veryWeak") && (
        <button className="generate" onClick={handleGenerate}>
          {translations[language].generate}
        </button>
      )}
      <br />
      <button className="language" onClick={toggleLanguage}>
        {translations[language].changeLanguage}
      </button>
    </div>
  );
}

export default App;
