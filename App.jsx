import { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ════════════════════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════════════════════ */
const CATS = [
  { id: 'food', ico: '🍽️', col: '#FF6B35', lk: 'food' },
  { id: 'transport', ico: '🚌', col: '#3B82F6', lk: 'transport' },
  { id: 'shopping', ico: '🛍️', col: '#8B5CF6', lk: 'shopping' },
  { id: 'bills', ico: '💡', col: '#F59E0B', lk: 'bills' },
  { id: 'health', ico: '💊', col: '#10B981', lk: 'health' },
  { id: 'fun', ico: '🎬', col: '#EC4899', lk: 'entertainment' },
  { id: 'other', ico: '📦', col: '#6B7280', lk: 'other' },
];

const CURRENCIES = [
  { c: 'INR', s: '₹', n: 'Indian Rupee' },
  { c: 'USD', s: '$', n: 'US Dollar' },
  { c: 'EUR', s: '€', n: 'Euro' },
  { c: 'GBP', s: '£', n: 'British Pound' },
  { c: 'JPY', s: '¥', n: 'Japanese Yen' },
  { c: 'CNY', s: '¥', n: 'Chinese Yuan' },
  { c: 'AED', s: 'د.إ', n: 'UAE Dirham' },
  { c: 'SAR', s: '﷼', n: 'Saudi Riyal' },
  { c: 'AUD', s: 'A$', n: 'Aus Dollar' },
  { c: 'CAD', s: 'C$', n: 'Can Dollar' },
  { c: 'CHF', s: 'Fr', n: 'Swiss Franc' },
  { c: 'SGD', s: 'S$', n: 'Singapore $' },
  { c: 'MYR', s: 'RM', n: 'Malaysian Ringgit' },
  { c: 'IDR', s: 'Rp', n: 'Indonesian Rupiah' },
  { c: 'THB', s: '฿', n: 'Thai Baht' },
  { c: 'PHP', s: '₱', n: 'Philippine Peso' },
  { c: 'KRW', s: '₩', n: 'Korean Won' },
  { c: 'HKD', s: 'HK$', n: 'Hong Kong $' },
  { c: 'BRL', s: 'R$', n: 'Brazilian Real' },
  { c: 'MXN', s: 'MX$', n: 'Mexican Peso' },
  { c: 'ZAR', s: 'R', n: 'South African Rand' },
  { c: 'EGP', s: 'E£', n: 'Egyptian Pound' },
  { c: 'PKR', s: '₨', n: 'Pakistani Rupee' },
  { c: 'BDT', s: '৳', n: 'Bangladeshi Taka' },
  { c: 'NGN', s: '₦', n: 'Nigerian Naira' },
  { c: 'RUB', s: '₽', n: 'Russian Ruble' },
  { c: 'TRY', s: '₺', n: 'Turkish Lira' },
  { c: 'SEK', s: 'kr', n: 'Swedish Krona' },
  { c: 'ILS', s: '₪', n: 'Israeli Shekel' },
  { c: 'QAR', s: 'QR', n: 'Qatari Riyal' },
  { c: 'KWD', s: 'KD', n: 'Kuwaiti Dinar' },
];

const LANG_NAMES = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ar: 'العربية',
};

const T = {
  en: {
    appName: 'Expense Tracker',
    by: 'from Sujit',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    createAcc: 'Create Account',
    signIn: 'Sign In',
    haveAcc: 'Already have an account?',
    noAcc: 'New user?',
    home: 'Home',
    add: 'Add',
    history: 'History',
    reports: 'Reports',
    settings: 'Settings',
    amount: 'Amount',
    cat: 'Category',
    note: 'Note (optional)',
    date: 'Date',
    addBtn: 'Add Expense',
    added: 'Added ✓',
    noExp: 'No expenses yet. Add one!',
    today: 'Today',
    thisMonth: 'This Month',
    total: 'Total Spent',
    avg: 'Avg / Day',
    txns: 'Transactions',
    topCat: 'Top Category',
    exportCSV: 'Export to CSV',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    lang: 'Language',
    curr: 'Currency',
    logout: 'Logout',
    monthComp: 'Monthly Comparison',
    catBreak: 'Category Breakdown',
    last6: 'Last 6 Months',
    selMonth: 'Select Month',
    del: 'Delete',
    food: 'Food',
    transport: 'Transport',
    shopping: 'Shopping',
    bills: 'Bills',
    health: 'Health',
    entertainment: 'Entertainment',
    other: 'Other',
    noData: 'No data for this period',
    errLogin: 'Invalid email or password',
    errExists: 'Email already registered',
    errFill: 'Fill all required fields',
    errPw: 'Password must be at least 6 characters',
    errEmail: 'Enter a valid email address',
    appearance: 'Appearance',
    finance: 'Finance',
    data: 'Data',
    profile: 'Profile',
    recentTx: 'Recent Transactions',
    totalExp: 'Total Expenses',
  },
  hi: {
    appName: 'खर्च ट्रैकर',
    by: 'सुजीत द्वारा',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    createAcc: 'खाता बनाएं',
    signIn: 'साइन इन',
    haveAcc: 'पहले से खाता है?',
    noAcc: 'नया यूजर?',
    home: 'होम',
    add: 'जोड़ें',
    history: 'इतिहास',
    reports: 'रिपोर्ट',
    settings: 'सेटिंग्स',
    amount: 'राशि',
    cat: 'श्रेणी',
    note: 'नोट (वैकल्पिक)',
    date: 'तारीख',
    addBtn: 'खर्च जोड़ें',
    added: 'जोड़ा गया ✓',
    noExp: 'कोई खर्च नहीं। जोड़ें!',
    today: 'आज',
    thisMonth: 'इस महीने',
    total: 'कुल खर्च',
    avg: 'औसत/दिन',
    txns: 'लेनदेन',
    topCat: 'शीर्ष श्रेणी',
    exportCSV: 'CSV निर्यात',
    theme: 'थीम',
    dark: 'डार्क',
    light: 'लाइट',
    lang: 'भाषा',
    curr: 'मुद्रा',
    logout: 'लॉगआउट',
    monthComp: 'मासिक तुलना',
    catBreak: 'श्रेणी विवरण',
    last6: 'पिछले 6 महीने',
    selMonth: 'महीना चुनें',
    del: 'हटाएं',
    food: 'खाना',
    transport: 'यात्रा',
    shopping: 'खरीदारी',
    bills: 'बिल',
    health: 'स्वास्थ्य',
    entertainment: 'मनोरंजन',
    other: 'अन्य',
    noData: 'इस महीने कोई डेटा नहीं',
    errLogin: 'गलत ईमेल या पासवर्ड',
    errExists: 'ईमेल पहले से मौजूद है',
    errFill: 'सभी फ़ील्ड भरें',
    errPw: 'पासवर्ड कम से कम 6 अक्षर होना चाहिए',
    errEmail: 'सही ईमेल दर्ज करें',
    appearance: 'दिखावट',
    finance: 'वित्त',
    data: 'डेटा',
    profile: 'प्रोफाइल',
    recentTx: 'हाल के लेनदेन',
    totalExp: 'कुल खर्चे',
  },
  mr: {
    appName: 'खर्च ट्रॅकर',
    by: 'सुजीत कडून',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    createAcc: 'खाते तयार करा',
    signIn: 'साइन इन',
    haveAcc: 'आधी खाते आहे?',
    noAcc: 'नवीन आहात?',
    home: 'होम',
    add: 'जोडा',
    history: 'इतिहास',
    reports: 'अहवाल',
    settings: 'सेटिंग्ज',
    amount: 'रक्कम',
    cat: 'श्रेणी',
    note: 'टीप (ऐच्छिक)',
    date: 'तारीख',
    addBtn: 'खर्च जोडा',
    added: 'जोडले ✓',
    noExp: 'कोणताही खर्च नाही. जोडा!',
    today: 'आज',
    thisMonth: 'या महिन्यात',
    total: 'एकूण खर्च',
    avg: 'सरासरी/दिवस',
    txns: 'व्यवहार',
    topCat: 'शीर्ष श्रेणी',
    exportCSV: 'CSV निर्यात',
    theme: 'थीम',
    dark: 'डार्क',
    light: 'लाइट',
    lang: 'भाषा',
    curr: 'चलन',
    logout: 'लॉगआउट',
    monthComp: 'मासिक तुलना',
    catBreak: 'श्रेणी तपशील',
    last6: 'गेल्या 6 महिने',
    selMonth: 'महिना निवडा',
    del: 'हटवा',
    food: 'जेवण',
    transport: 'प्रवास',
    shopping: 'खरेदी',
    bills: 'बिल',
    health: 'आरोग्य',
    entertainment: 'मनोरंजन',
    other: 'इतर',
    noData: 'या महिन्यासाठी डेटा नाही',
    errLogin: 'चुकीचा ईमेल किंवा पासवर्ड',
    errExists: 'ईमेल आधीच नोंदणीकृत',
    errFill: 'सर्व फील्ड भरा',
    errPw: 'पासवर्ड किमान 6 अक्षरे',
    errEmail: 'वैध ईमेल प्रविष्ट करा',
    appearance: 'देखावा',
    finance: 'वित्त',
    data: 'डेटा',
    profile: 'प्रोफाइल',
    recentTx: 'अलीकडील व्यवहार',
    totalExp: 'एकूण खर्चे',
  },
  es: {
    appName: 'Mis Gastos',
    by: 'de Sujit',
    login: 'Entrar',
    signup: 'Registrarse',
    email: 'Correo',
    password: 'Contraseña',
    createAcc: 'Crear Cuenta',
    signIn: 'Iniciar sesión',
    haveAcc: '¿Ya tienes cuenta?',
    noAcc: '¿Nuevo?',
    home: 'Inicio',
    add: 'Agregar',
    history: 'Historial',
    reports: 'Informes',
    settings: 'Config',
    amount: 'Monto',
    cat: 'Categoría',
    note: 'Nota (opcional)',
    date: 'Fecha',
    addBtn: 'Agregar Gasto',
    added: 'Agregado ✓',
    noExp: 'Sin gastos aún. ¡Agrega uno!',
    today: 'Hoy',
    thisMonth: 'Este Mes',
    total: 'Total Gastado',
    avg: 'Prom/Día',
    txns: 'Transacciones',
    topCat: 'Top Categoría',
    exportCSV: 'Exportar CSV',
    theme: 'Tema',
    dark: 'Oscuro',
    light: 'Claro',
    lang: 'Idioma',
    curr: 'Moneda',
    logout: 'Salir',
    monthComp: 'Comparación Mensual',
    catBreak: 'Por Categoría',
    last6: 'Últimos 6 Meses',
    selMonth: 'Seleccionar Mes',
    del: 'Eliminar',
    food: 'Comida',
    transport: 'Transporte',
    shopping: 'Compras',
    bills: 'Facturas',
    health: 'Salud',
    entertainment: 'Entretenimiento',
    other: 'Otro',
    noData: 'Sin datos para este período',
    errLogin: 'Email o contraseña inválidos',
    errExists: 'Email ya registrado',
    errFill: 'Completa todos los campos',
    errPw: 'Mínimo 6 caracteres',
    errEmail: 'Email inválido',
    appearance: 'Apariencia',
    finance: 'Finanzas',
    data: 'Datos',
    profile: 'Perfil',
    recentTx: 'Transacciones Recientes',
    totalExp: 'Total Gastos',
  },
  fr: {
    appName: 'Mes Dépenses',
    by: 'par Sujit',
    login: 'Connexion',
    signup: "S'inscrire",
    email: 'Email',
    password: 'Mot de passe',
    createAcc: 'Créer un compte',
    signIn: 'Se connecter',
    haveAcc: 'Déjà un compte?',
    noAcc: 'Nouveau?',
    home: 'Accueil',
    add: 'Ajouter',
    history: 'Historique',
    reports: 'Rapports',
    settings: 'Paramètres',
    amount: 'Montant',
    cat: 'Catégorie',
    note: 'Note (optionnel)',
    date: 'Date',
    addBtn: 'Ajouter Dépense',
    added: 'Ajouté ✓',
    noExp: 'Aucune dépense. Ajoutez-en!',
    today: "Aujourd'hui",
    thisMonth: 'Ce Mois',
    total: 'Total Dépensé',
    avg: 'Moy/Jour',
    txns: 'Transactions',
    topCat: 'Top Catégorie',
    exportCSV: 'Exporter CSV',
    theme: 'Thème',
    dark: 'Sombre',
    light: 'Clair',
    lang: 'Langue',
    curr: 'Devise',
    logout: 'Déconnexion',
    monthComp: 'Comparaison Mensuelle',
    catBreak: 'Par Catégorie',
    last6: '6 Derniers Mois',
    selMonth: 'Sélectionner Mois',
    del: 'Supprimer',
    food: 'Nourriture',
    transport: 'Transport',
    shopping: 'Shopping',
    bills: 'Factures',
    health: 'Santé',
    entertainment: 'Loisirs',
    other: 'Autre',
    noData: 'Pas de données',
    errLogin: 'Email ou mot de passe invalide',
    errExists: 'Email déjà utilisé',
    errFill: 'Remplir tous les champs',
    errPw: 'Min. 6 caractères',
    errEmail: 'Email invalide',
    appearance: 'Apparence',
    finance: 'Finance',
    data: 'Données',
    profile: 'Profil',
    recentTx: 'Transactions Récentes',
    totalExp: 'Total Dépenses',
  },
  de: {
    appName: 'Ausgaben',
    by: 'von Sujit',
    login: 'Anmelden',
    signup: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    createAcc: 'Konto erstellen',
    signIn: 'Einloggen',
    haveAcc: 'Schon ein Konto?',
    noAcc: 'Neu hier?',
    home: 'Start',
    add: 'Hinzufügen',
    history: 'Verlauf',
    reports: 'Berichte',
    settings: 'Einstellungen',
    amount: 'Betrag',
    cat: 'Kategorie',
    note: 'Notiz (optional)',
    date: 'Datum',
    addBtn: 'Ausgabe hinzufügen',
    added: 'Hinzugefügt ✓',
    noExp: 'Keine Ausgaben. Hinzufügen!',
    today: 'Heute',
    thisMonth: 'Diesen Monat',
    total: 'Gesamt',
    avg: 'Ø/Tag',
    txns: 'Transaktionen',
    topCat: 'Top Kategorie',
    exportCSV: 'CSV exportieren',
    theme: 'Design',
    dark: 'Dunkel',
    light: 'Hell',
    lang: 'Sprache',
    curr: 'Währung',
    logout: 'Abmelden',
    monthComp: 'Monatsvergleich',
    catBreak: 'Nach Kategorie',
    last6: 'Letzte 6 Monate',
    selMonth: 'Monat wählen',
    del: 'Löschen',
    food: 'Essen',
    transport: 'Transport',
    shopping: 'Einkaufen',
    bills: 'Rechnungen',
    health: 'Gesundheit',
    entertainment: 'Unterhaltung',
    other: 'Sonstiges',
    noData: 'Keine Daten',
    errLogin: 'Ungültige E-Mail oder Passwort',
    errExists: 'E-Mail bereits registriert',
    errFill: 'Alle Felder ausfüllen',
    errPw: 'Min. 6 Zeichen',
    errEmail: 'Ungültige E-Mail',
    appearance: 'Aussehen',
    finance: 'Finanzen',
    data: 'Daten',
    profile: 'Profil',
    recentTx: 'Letzte Transaktionen',
    totalExp: 'Gesamt Ausgaben',
  },
  ja: {
    appName: '支出管理',
    by: 'Sujitより',
    login: 'ログイン',
    signup: '登録',
    email: 'メール',
    password: 'パスワード',
    createAcc: 'アカウント作成',
    signIn: 'サインイン',
    haveAcc: 'アカウントをお持ちの方',
    noAcc: '初めての方',
    home: 'ホーム',
    add: '追加',
    history: '履歴',
    reports: 'レポート',
    settings: '設定',
    amount: '金額',
    cat: 'カテゴリー',
    note: 'メモ（任意）',
    date: '日付',
    addBtn: '支出を追加',
    added: '追加しました ✓',
    noExp: '支出なし。追加してください！',
    today: '今日',
    thisMonth: '今月',
    total: '合計',
    avg: '平均/日',
    txns: '取引数',
    topCat: 'トップ',
    exportCSV: 'CSVエクスポート',
    theme: 'テーマ',
    dark: 'ダーク',
    light: 'ライト',
    lang: '言語',
    curr: '通貨',
    logout: 'ログアウト',
    monthComp: '月別比較',
    catBreak: 'カテゴリー別',
    last6: '直近6ヶ月',
    selMonth: '月を選択',
    del: '削除',
    food: '食事',
    transport: '交通',
    shopping: '買物',
    bills: '請求',
    health: '健康',
    entertainment: '娯楽',
    other: 'その他',
    noData: 'データなし',
    errLogin: '無効なメールまたはパスワード',
    errExists: 'メール登録済み',
    errFill: '全て入力',
    errPw: '6文字以上',
    errEmail: '有効なメール',
    appearance: '外観',
    finance: '財務',
    data: 'データ',
    profile: 'プロフィール',
    recentTx: '最近の取引',
    totalExp: '総支出',
  },
  ar: {
    appName: 'متتبع المصاريف',
    by: 'من سوجيت',
    login: 'دخول',
    signup: 'تسجيل',
    email: 'البريد',
    password: 'كلمة المرور',
    createAcc: 'إنشاء حساب',
    signIn: 'تسجيل الدخول',
    haveAcc: 'لديك حساب؟',
    noAcc: 'جديد؟',
    home: 'الرئيسية',
    add: 'إضافة',
    history: 'التاريخ',
    reports: 'التقارير',
    settings: 'الإعدادات',
    amount: 'المبلغ',
    cat: 'الفئة',
    note: 'ملاحظة (اختياري)',
    date: 'التاريخ',
    addBtn: 'إضافة مصروف',
    added: 'تمت الإضافة ✓',
    noExp: 'لا مصاريف بعد. أضف الآن!',
    today: 'اليوم',
    thisMonth: 'هذا الشهر',
    total: 'المجموع',
    avg: 'المعدل/يوم',
    txns: 'المعاملات',
    topCat: 'الأعلى',
    exportCSV: 'تصدير CSV',
    theme: 'السمة',
    dark: 'داكن',
    light: 'فاتح',
    lang: 'اللغة',
    curr: 'العملة',
    logout: 'خروج',
    monthComp: 'المقارنة الشهرية',
    catBreak: 'حسب الفئة',
    last6: 'آخر 6 أشهر',
    selMonth: 'اختر الشهر',
    del: 'حذف',
    food: 'طعام',
    transport: 'مواصلات',
    shopping: 'تسوق',
    bills: 'فواتير',
    health: 'صحة',
    entertainment: 'ترفيه',
    other: 'أخرى',
    noData: 'لا بيانات لهذه الفترة',
    errLogin: 'بريد أو كلمة مرور خاطئة',
    errExists: 'البريد مسجل مسبقاً',
    errFill: 'أكمل جميع الحقول',
    errPw: '6 أحرف على الأقل',
    errEmail: 'بريد إلكتروني غير صحيح',
    appearance: 'المظهر',
    finance: 'المالية',
    data: 'البيانات',
    profile: 'الملف الشخصي',
    recentTx: 'المعاملات الأخيرة',
    totalExp: 'إجمالي المصاريف',
  },
};

const TV = {
  dark: {
    bg: '#080808',
    s1: '#111111',
    s2: '#181818',
    s3: '#212121',
    tx: '#EFEFEF',
    tx2: '#888888',
    tx3: '#333333',
    br: 'rgba(255,255,255,0.06)',
    br2: 'rgba(255,255,255,0.12)',
    ac: '#00C896',
    acD: '#009970',
    acBg: 'rgba(0,200,150,0.1)',
    dng: '#FF5050',
    inp: '#181818',
  },
  light: {
    bg: '#F2F1EC',
    s1: '#FFFFFF',
    s2: '#ECEAE3',
    s3: '#E2E0D8',
    tx: '#1A1A1A',
    tx2: '#666666',
    tx3: '#BBBBBB',
    br: 'rgba(0,0,0,0.07)',
    br2: 'rgba(0,0,0,0.13)',
    ac: '#00A878',
    acD: '#007A58',
    acBg: 'rgba(0,168,120,0.08)',
    dng: '#E83030',
    inp: '#ECEAE3',
  },
};

/* ════════════════════════════════════════════════════════
   UTILS
════════════════════════════════════════════════════════ */
const todayStr = () => new Date().toISOString().split('T')[0];
const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);
const hashPw = (s) => btoa(unescape(encodeURIComponent(s + '__ET_SUJIT__')));
const getSym = (code) => CURRENCIES.find((c) => c.c === code)?.s || code;
const fmt = (n, code) =>
  getSym(code) + Math.round(Math.abs(n)).toLocaleString();

const sGet = async (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const sSet = async (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};
const doExportCSV = (expenses, currency, t) => {
  const header = 'Date,Category,Note,Amount,Currency\n';
  const rows = expenses
    .map((e) => {
      const cat = t[e.category] || e.category;
      const note = (e.note || '').replace(/"/g, '""');
      return `${e.date},${cat},"${note}",${e.amount},${currency}`;
    })
    .join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses_${new Date().toISOString().slice(0, 7)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const getLast6Months = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      ym: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label:
        d.toLocaleString('en', { month: 'short' }) +
        " '" +
        d.getFullYear().toString().slice(2),
    };
  });
};

const getMonthOptions = (expenses) => {
  const now = new Date();
  const curYm = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const set = new Set(expenses.map((e) => e.date.slice(0, 7)));
  set.add(curYm);
  return Array.from(set)
    .sort((a, b) => b.localeCompare(a))
    .map((ym) => {
      const [y, m] = ym.split('-');
      const d = new Date(parseInt(y), parseInt(m) - 1, 1);
      return { ym, label: d.toLocaleString('en', { month: 'long' }) + ' ' + y };
    });
};

/* ════════════════════════════════════════════════════════
   SHARED STYLES
════════════════════════════════════════════════════════ */
const iSt = (th) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 15px',
  fontSize: 15,
  background: th.inp,
  color: th.tx,
  border: `1px solid ${th.br2}`,
  borderRadius: 12,
  outline: 'none',
  fontFamily: 'inherit',
  WebkitAppearance: 'none',
  appearance: 'none',
  colorScheme: th === TV.dark ? 'dark' : 'light',
});

/* ════════════════════════════════════════════════════════
   LOGO SVG
════════════════════════════════════════════════════════ */
const LogoSVG = ({ size = 40, ac }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <rect width="56" height="56" rx="16" fill={ac} />
    <rect
      x="9"
      y="19"
      width="38"
      height="24"
      rx="5"
      fill="rgba(255,255,255,0.95)"
    />
    <path d="M9 26h38" stroke={ac} strokeWidth="2.5" />
    <rect x="31" y="29" width="13" height="9" rx="3" fill={ac} />
    <circle cx="37.5" cy="33.5" r="2.2" fill="rgba(255,255,255,0.9)" />
    <path d="M16 14 L40 14 L44 19 H12 Z" fill="rgba(255,255,255,0.75)" />
  </svg>
);

/* ════════════════════════════════════════════════════════
   SPLASH SCREEN
════════════════════════════════════════════════════════ */
function SplashScreen({ th }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: th.bg,
        gap: 18,
      }}
    >
      <style>{`
        @keyframes et-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        @keyframes et-fade{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
      `}</style>
      <div style={{ animation: 'et-pulse 2s ease-in-out infinite' }}>
        <LogoSVG size={80} ac={th.ac} />
      </div>
      <div
        style={{
          textAlign: 'center',
          animation: 'et-fade 0.6s ease 0.3s both',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: th.tx,
            letterSpacing: '-0.5px',
          }}
        >
          Expense Tracker
        </div>
        <div
          style={{
            fontSize: 13,
            color: th.tx2,
            marginTop: 5,
            letterSpacing: '0.2px',
          }}
        >
          from Sujit
        </div>
      </div>
      <div
        style={{
          width: 36,
          height: 4,
          borderRadius: 2,
          background: th.br2,
          overflow: 'hidden',
          marginTop: 8,
          animation: 'et-fade 0.6s ease 0.5s both',
        }}
      >
        <div
          style={{
            height: '100%',
            background: th.ac,
            animation: 'et-fill 2s ease-in-out forwards',
            borderRadius: 2,
          }}
        />
      </div>
      <style>{`@keyframes et-fill{0%{width:0}100%{width:100%}}`}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   AUTH SCREEN
════════════════════════════════════════════════════════ */
function AuthScreen({ th, onLogin, onSignup }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const t = T.en;

  const validate = () => {
    if (!email.trim() || !pw.trim()) return t.errFill;
    if (!email.includes('@') || !email.includes('.')) return t.errEmail;
    if (pw.length < 6) return t.errPw;
    return null;
  };

  const handle = async () => {
    const e = validate();
    if (e) {
      setErr(e);
      return;
    }
    setLoading(true);
    setErr('');
    const result =
      mode === 'login'
        ? await onLogin(email.trim().toLowerCase(), pw)
        : await onSignup(email.trim().toLowerCase(), pw);
    if (result) {
      setErr(result);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: th.bg,
        padding: '0 28px',
      }}
    >
      <style>{`@keyframes et-in{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}`}</style>
      <div
        style={{
          animation: 'et-in 0.5s ease both',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoSVG size={58} ac={th.ac} />
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: th.tx,
            marginTop: 14,
            letterSpacing: '-0.5px',
          }}
        >
          Expense Tracker
        </div>
        <div style={{ fontSize: 13, color: th.tx2, marginBottom: 32 }}>
          from Sujit
        </div>

        {/* Tab */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            background: th.s2,
            borderRadius: 14,
            padding: 4,
            marginBottom: 22,
          }}
        >
          {['login', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setErr('');
              }}
              style={{
                flex: 1,
                padding: '11px 0',
                border: 'none',
                borderRadius: 11,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 500,
                background: mode === m ? th.s1 : 'transparent',
                color: mode === m ? th.tx : th.tx2,
                transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? t.login : t.signup}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={iSt(th)}
          />
          <input
            type="password"
            placeholder={`${t.password} (min 6)`}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handle()}
            style={iSt(th)}
          />
        </div>

        {err && (
          <div
            style={{
              width: '100%',
              padding: '10px 14px',
              marginTop: 10,
              background: `${th.dng}20`,
              color: th.dng,
              borderRadius: 10,
              fontSize: 13,
              boxSizing: 'border-box',
            }}
          >
            {err}
          </div>
        )}

        <button
          onClick={handle}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            marginTop: 18,
            fontSize: 15,
            fontWeight: 600,
            background: loading ? th.s3 : th.ac,
            color: loading ? th.tx2 : '#fff',
            border: 'none',
            borderRadius: 14,
            cursor: loading ? 'default' : 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
        >
          {loading ? '...' : mode === 'login' ? t.signIn : t.createAcc}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   DASHBOARD VIEW
════════════════════════════════════════════════════════ */
function DashboardView({ th, t, expenses, currency }) {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const td = todayStr();
  const mExp = expenses.filter((e) => e.date.startsWith(ym));
  const tExp = expenses.filter((e) => e.date === td);
  const totalM = mExp.reduce((s, e) => s + e.amount, 0);
  const totalT = tExp.reduce((s, e) => s + e.amount, 0);
  const daysInM = now.getDate();
  const topCat = CATS.map((c) => ({
    ...c,
    total: mExp
      .filter((e) => e.category === c.id)
      .reduce((s, e) => s + e.amount, 0),
  })).sort((a, b) => b.total - a.total)[0];

  return (
    <div
      style={{
        padding: '18px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(140deg, ${th.ac} 0%, ${th.acD} 100%)`,
          borderRadius: 22,
          padding: '22px 20px',
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 500,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
          }}
        >
          {t.thisMonth} —{' '}
          {now.toLocaleString('en', { month: 'long', year: 'numeric' })}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: '#fff',
            marginTop: 4,
            letterSpacing: '-1.5px',
            lineHeight: 1,
          }}
        >
          {fmt(totalM, currency)}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 16,
            paddingTop: 14,
            borderTop: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {[
            { label: t.today, val: fmt(totalT, currency) },
            { label: t.avg, val: fmt(totalM / Math.max(daysInM, 1), currency) },
            { label: t.txns, val: mExp.length },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#fff',
                  marginTop: 2,
                }}
              >
                {s.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top category */}
      {topCat?.total > 0 && (
        <div
          style={{
            background: th.s1,
            borderRadius: 16,
            padding: '14px 16px',
            border: `0.5px solid ${th.br}`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: topCat.col + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            {topCat.ico}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                color: th.tx2,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              {t.topCat}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: th.tx }}>
              {t[topCat.lk]}
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: topCat.col }}>
            {fmt(topCat.total, currency)}
          </div>
        </div>
      )}

      {/* Recent transactions */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: th.tx2,
            fontWeight: 500,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t.recentTx}
        </div>
        {expenses.length === 0 ? (
          <div
            style={{
              background: th.s1,
              borderRadius: 16,
              padding: '32px 16px',
              textAlign: 'center',
              border: `0.5px solid ${th.br}`,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>💸</div>
            <div style={{ color: th.tx2, fontSize: 14 }}>{t.noExp}</div>
          </div>
        ) : (
          <div
            style={{
              background: th.s1,
              borderRadius: 16,
              border: `0.5px solid ${th.br}`,
              overflow: 'hidden',
            }}
          >
            {expenses.slice(0, 6).map((e, i) => {
              const cat = CATS.find((c) => c.id === e.category) || CATS[6];
              return (
                <div
                  key={e.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 14px',
                    gap: 12,
                    borderTop: i > 0 ? `0.5px solid ${th.br}` : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: cat.col + '1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {cat.ico}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        color: th.tx,
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {e.note || t[cat.lk]}
                    </div>
                    <div style={{ fontSize: 11, color: th.tx2 }}>{e.date}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: th.tx,
                      flexShrink: 0,
                    }}
                  >
                    {fmt(e.amount, currency)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ADD VIEW
════════════════════════════════════════════════════════ */
function AddView({ th, t, currency, onAdd }) {
  const [amount, setAmount] = useState('');
  const [cat, setCat] = useState('food');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(todayStr());
  const [flash, setFlash] = useState(false);

  const handle = async () => {
    const n = parseFloat(amount);
    if (!n || n <= 0) return;
    await onAdd({
      id: genId(),
      amount: n,
      category: cat,
      note: note.trim(),
      date,
    });
    setAmount('');
    setNote('');
    setFlash(true);
    setTimeout(() => setFlash(false), 1800);
  };

  return (
    <div
      style={{
        padding: '18px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Amount */}
      <div
        style={{
          background: th.s1,
          borderRadius: 20,
          padding: '20px 18px',
          border: `0.5px solid ${th.br}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: th.tx2,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t.amount}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 26,
              color: th.tx2,
              fontWeight: 300,
              flexShrink: 0,
            }}
          >
            {getSym(currency)}
          </span>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flex: 1,
              fontSize: 38,
              fontWeight: 700,
              background: 'transparent',
              border: 'none',
              color: th.tx,
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: th.tx2,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t.cat}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 8,
          }}
        >
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                padding: '12px 4px',
                borderRadius: 14,
                cursor: 'pointer',
                border: `1.5px solid ${cat === c.id ? c.col : th.br2}`,
                background: cat === c.id ? c.col + '1A' : th.s1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 22 }}>{c.ico}</span>
              <span
                style={{
                  fontSize: 9,
                  color: cat === c.id ? c.col : th.tx2,
                  fontWeight: cat === c.id ? 600 : 400,
                  fontFamily: 'inherit',
                }}
              >
                {t[c.lk]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Note + Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <div
            style={{
              fontSize: 11,
              color: th.tx2,
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t.note}
          </div>
          <input
            type="text"
            placeholder="e.g. Lunch..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={iSt(th)}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              color: th.tx2,
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t.date}
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={iSt(th)}
          />
        </div>
      </div>

      <button
        onClick={handle}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: 16,
          fontWeight: 600,
          background: flash ? th.acD : th.ac,
          color: '#fff',
          border: 'none',
          borderRadius: 16,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.3s',
        }}
      >
        {flash ? t.added : t.addBtn}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   HISTORY VIEW
════════════════════════════════════════════════════════ */
function HistoryView({ th, t, expenses, currency, onDelete }) {
  const now = new Date();
  const curYm = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const [selYm, setSelYm] = useState(curYm);
  const monthOpts = getMonthOptions(expenses);
  const filtered = expenses.filter((e) => e.date.startsWith(selYm));
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const grouped = {};
  filtered.forEach((e) => {
    (grouped[e.date] = grouped[e.date] || []).push(e);
  });
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div
      style={{
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Month picker */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <select
            value={selYm}
            onChange={(e) => setSelYm(e.target.value)}
            style={{ ...iSt(th), paddingRight: 32 }}
          >
            {monthOpts.map((o) => (
              <option
                key={o.ym}
                value={o.ym}
                style={{ background: th.inp, color: th.tx }}
              >
                {o.label}
              </option>
            ))}
          </select>
          <span
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: th.tx2,
              fontSize: 12,
              pointerEvents: 'none',
            }}
          >
            ▾
          </span>
        </div>
        <div
          style={{
            flexShrink: 0,
            background: th.acBg,
            color: th.ac,
            padding: '12px 14px',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {fmt(total, currency)}
        </div>
      </div>

      {dates.length === 0 ? (
        <div
          style={{
            background: th.s1,
            borderRadius: 16,
            padding: '40px 16px',
            textAlign: 'center',
            border: `0.5px solid ${th.br}`,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>📭</div>
          <div style={{ color: th.tx2, fontSize: 14 }}>{t.noData}</div>
        </div>
      ) : (
        dates.map((date) => {
          const dayTotal = grouped[date].reduce((s, e) => s + e.amount, 0);
          const isToday = date === todayStr();
          const d = new Date(date + 'T12:00:00');
          const label = isToday
            ? t.today
            : d.toLocaleDateString('en', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              });
          return (
            <div key={date}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: th.tx2,
                  fontWeight: 500,
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                <span>{label}</span>
                <span>{fmt(dayTotal, currency)}</span>
              </div>
              <div
                style={{
                  background: th.s1,
                  borderRadius: 16,
                  border: `0.5px solid ${th.br}`,
                  overflow: 'hidden',
                }}
              >
                {grouped[date].map((e, i) => {
                  const cat = CATS.find((c) => c.id === e.category) || CATS[6];
                  return (
                    <div
                      key={e.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 14px',
                        gap: 12,
                        borderTop: i > 0 ? `0.5px solid ${th.br}` : 'none',
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: cat.col + '1A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {cat.ico}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 14,
                            color: th.tx,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {e.note || t[cat.lk]}
                        </div>
                        <div style={{ fontSize: 11, color: th.tx2 }}>
                          {t[cat.lk]}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: th.tx,
                          flexShrink: 0,
                        }}
                      >
                        {fmt(e.amount, currency)}
                      </div>
                      <button
                        onClick={() => onDelete(e.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: th.tx3,
                          fontSize: 14,
                          padding: 4,
                          flexShrink: 0,
                          lineHeight: 1,
                          borderRadius: 6,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   REPORTS VIEW
════════════════════════════════════════════════════════ */
function ReportsView({ th, t, expenses, currency }) {
  const now = new Date();
  const curYm = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const [selYm, setSelYm] = useState(curYm);
  const monthOpts = getMonthOptions(expenses);

  const mExp = expenses.filter((e) => e.date.startsWith(selYm));
  const total = mExp.reduce((s, e) => s + e.amount, 0);
  const [y, m] = selYm.split('-');
  const daysInM = new Date(parseInt(y), parseInt(m), 0).getDate();

  const catData = CATS.map((c) => ({
    name: t[c.lk],
    col: c.col,
    ico: c.ico,
    value: mExp
      .filter((e) => e.category === c.id)
      .reduce((s, e) => s + e.amount, 0),
  }))
    .filter((c) => c.value > 0)
    .sort((a, b) => b.value - a.value);

  const last6data = getLast6Months().map(({ ym, label }) => ({
    name: label,
    total: expenses
      .filter((e) => e.date.startsWith(ym))
      .reduce((s, e) => s + e.amount, 0),
  }));

  const TT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          background: th.s2,
          border: `0.5px solid ${th.br2}`,
          borderRadius: 10,
          padding: '8px 12px',
          fontSize: 13,
        }}
      >
        <div style={{ color: th.tx2, marginBottom: 2 }}>{label}</div>
        <div style={{ color: th.ac, fontWeight: 700 }}>
          {fmt(payload[0].value, currency)}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Month picker */}
      <div style={{ position: 'relative' }}>
        <select
          value={selYm}
          onChange={(e) => setSelYm(e.target.value)}
          style={{ ...iSt(th), paddingRight: 32 }}
        >
          {monthOpts.map((o) => (
            <option
              key={o.ym}
              value={o.ym}
              style={{ background: th.inp, color: th.tx }}
            >
              {o.label}
            </option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: th.tx2,
            fontSize: 12,
            pointerEvents: 'none',
          }}
        >
          ▾
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: t.total, val: fmt(total, currency) },
          { label: t.txns, val: mExp.length },
          { label: t.avg, val: fmt(total / Math.max(daysInM, 1), currency) },
          {
            label: t.topCat,
            val:
              catData.length > 0 ? catData[0].ico + ' ' + catData[0].name : '—',
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: th.s1,
              borderRadius: 14,
              padding: '14px 16px',
              border: `0.5px solid ${th.br}`,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: th.tx2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 4,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: th.tx }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      {catData.length > 0 && (
        <div
          style={{
            background: th.s1,
            borderRadius: 18,
            padding: '16px',
            border: `0.5px solid ${th.br}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: th.tx2,
              fontWeight: 500,
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t.catBreak}
          </div>
          <div style={{ height: 160, marginBottom: 14 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={catData}
                  cx="50%"
                  cy="50%"
                  outerRadius={68}
                  innerRadius={30}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {catData.map((e, i) => (
                    <Cell key={i} fill={e.col} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [fmt(v, currency), '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {catData.map((c) => (
            <div
              key={c.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 9,
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{c.ico}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 3,
                  }}
                >
                  <span style={{ fontSize: 13, color: th.tx }}>{c.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: th.tx }}>
                    {fmt(c.value, currency)}
                  </span>
                </div>
                <div style={{ height: 4, background: th.s3, borderRadius: 2 }}>
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 2,
                      background: c.col,
                      width: `${Math.round((c.value / total) * 100)}%`,
                      transition: 'width 0.5s',
                    }}
                  />
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: th.tx2,
                  minWidth: 28,
                  textAlign: 'right',
                }}
              >
                {Math.round((c.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Last 6 months bar */}
      <div
        style={{
          background: th.s1,
          borderRadius: 18,
          padding: '16px',
          border: `0.5px solid ${th.br}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: th.tx2,
            fontWeight: 500,
            marginBottom: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t.last6}
        </div>
        <div style={{ height: 170 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={last6data}
              margin={{ top: 4, right: 4, bottom: 0, left: -18 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: th.tx2 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: th.tx2 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  v > 0 ? getSym(currency) + Math.round(v / 1000) + 'k' : ''
                }
              />
              <Tooltip content={<TT />} />
              <Bar dataKey="total" fill={th.ac} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SETTINGS VIEW
════════════════════════════════════════════════════════ */
function SettingsView({ th, t, settings, user, expenses, onUpdate, onLogout }) {
  const [exDone, setExDone] = useState(false);

  const handleExport = () => {
    doExportCSV(expenses, settings.currency, t);
    setExDone(true);
    setTimeout(() => setExDone(false), 2000);
  };

  const SS = ({ label, children, noBorder }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: noBorder ? 'none' : `0.5px solid ${th.br}`,
      }}
    >
      <span style={{ fontSize: 14, color: th.tx }}>{label}</span>
      <div>{children}</div>
    </div>
  );

  const selSt = {
    ...iSt(th),
    width: 'auto',
    padding: '7px 30px 7px 10px',
    fontSize: 13,
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '16px 14px' }}>
      {/* Profile card */}
      <div
        style={{
          background: th.s1,
          borderRadius: 18,
          padding: '16px',
          border: `0.5px solid ${th.br}`,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            background: `linear-gradient(135deg,${th.ac},${th.acD})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 800,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          {user.email[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: th.tx }}>
            {user.email}
          </div>
          <div style={{ fontSize: 12, color: th.tx2, marginTop: 2 }}>
            {expenses.length} {t.totalExp}
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div
        style={{
          fontSize: 11,
          color: th.tx2,
          fontWeight: 500,
          marginBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          paddingLeft: 2,
        }}
      >
        {t.appearance}
      </div>
      <div
        style={{
          background: th.s1,
          borderRadius: 16,
          border: `0.5px solid ${th.br}`,
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <SS label={t.theme}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['dark', 'light'].map((m) => (
              <button
                key={m}
                onClick={() => onUpdate({ ...settings, theme: m })}
                style={{
                  padding: '7px 12px',
                  borderRadius: 9,
                  border: `1.5px solid ${
                    settings.theme === m ? th.ac : th.br2
                  }`,
                  background: settings.theme === m ? th.ac : 'transparent',
                  color: settings.theme === m ? '#fff' : th.tx2,
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {m === 'dark' ? '🌙 ' + t.dark : '☀️ ' + t.light}
              </button>
            ))}
          </div>
        </SS>
        <SS label={t.lang} noBorder>
          <div style={{ position: 'relative' }}>
            <select
              value={settings.lang}
              onChange={(e) => onUpdate({ ...settings, lang: e.target.value })}
              style={selSt}
            >
              {Object.entries(LANG_NAMES).map(([k, v]) => (
                <option
                  key={k}
                  value={k}
                  style={{ background: th.inp, color: th.tx }}
                >
                  {v}
                </option>
              ))}
            </select>
            <span
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: th.tx2,
                fontSize: 11,
                pointerEvents: 'none',
              }}
            >
              ▾
            </span>
          </div>
        </SS>
      </div>

      {/* Finance */}
      <div
        style={{
          fontSize: 11,
          color: th.tx2,
          fontWeight: 500,
          marginBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          paddingLeft: 2,
        }}
      >
        {t.finance}
      </div>
      <div
        style={{
          background: th.s1,
          borderRadius: 16,
          border: `0.5px solid ${th.br}`,
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <SS label={t.curr} noBorder>
          <div style={{ position: 'relative' }}>
            <select
              value={settings.currency}
              onChange={(e) =>
                onUpdate({ ...settings, currency: e.target.value })
              }
              style={selSt}
            >
              {CURRENCIES.map((c) => (
                <option
                  key={c.c}
                  value={c.c}
                  style={{ background: th.inp, color: th.tx }}
                >
                  {c.s} {c.c} — {c.n}
                </option>
              ))}
            </select>
            <span
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: th.tx2,
                fontSize: 11,
                pointerEvents: 'none',
              }}
            >
              ▾
            </span>
          </div>
        </SS>
      </div>

      {/* Data */}
      <div
        style={{
          fontSize: 11,
          color: th.tx2,
          fontWeight: 500,
          marginBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          paddingLeft: 2,
        }}
      >
        {t.data}
      </div>
      <div
        style={{
          background: th.s1,
          borderRadius: 16,
          border: `0.5px solid ${th.br}`,
          overflow: 'hidden',
          marginBottom: 20,
        }}
      >
        <SS label={t.exportCSV} noBorder>
          <button
            onClick={handleExport}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              background: th.acBg,
              color: th.ac,
              border: `1px solid ${th.ac}50`,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
            }}
          >
            {exDone ? '✓ Done!' : '⬇ Export'}
          </button>
        </SS>
      </div>

      <button
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '15px',
          background: `${th.dng}18`,
          color: th.dng,
          border: `1px solid ${th.dng}30`,
          borderRadius: 16,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {t.logout}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   BOTTOM NAV
════════════════════════════════════════════════════════ */
function BottomNav({ th, t, tab, setTab }) {
  const TABS = [
    { id: 'home', icon: '⌂', lk: 'home' },
    { id: 'add', icon: '＋', lk: 'add' },
    { id: 'history', icon: '☰', lk: 'history' },
    { id: 'reports', icon: '◑', lk: 'reports' },
    { id: 'settings', icon: '⚙', lk: 'settings' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexShrink: 0,
        background: th.s1,
        borderTop: `0.5px solid ${th.br}`,
      }}
    >
      {TABS.map((tb) => (
        <button
          key={tb.id}
          onClick={() => setTab(tb.id)}
          style={{
            flex: 1,
            padding: '10px 0 8px',
            border: 'none',
            cursor: 'pointer',
            background: tab === tb.id ? th.acBg : 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            transition: 'background 0.15s',
          }}
        >
          <span
            style={{
              fontSize: 17,
              lineHeight: '1',
              opacity: tab === tb.id ? 1 : 0.4,
              color: tab === tb.id ? th.ac : th.tx,
            }}
          >
            {tb.icon}
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: tab === tb.id ? 600 : 400,
              color: tab === tb.id ? th.ac : th.tx2,
              fontFamily: 'inherit',
            }}
          >
            {t[tb.lk]}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════════ */
function MainApp({
  th,
  t,
  expenses,
  settings,
  user,
  onAdd,
  onDelete,
  onUpdateSettings,
  onLogout,
}) {
  const [tab, setTab] = useState('home');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: th.bg,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '14px 16px 10px',
          background: th.s1,
          borderBottom: `0.5px solid ${th.br}`,
          flexShrink: 0,
        }}
      >
        <LogoSVG size={28} ac={th.ac} />
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: th.tx,
            marginLeft: 8,
            letterSpacing: '-0.3px',
          }}
        >
          Expense Tracker
        </span>
        <span
          style={{ fontSize: 11, color: th.tx2, marginLeft: 6, marginTop: 1 }}
        >
          · from Sujit
        </span>
        <div
          style={{
            marginLeft: 'auto',
            width: 32,
            height: 32,
            borderRadius: 16,
            background: `linear-gradient(135deg,${th.ac},${th.acD})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 800,
            color: '#fff',
          }}
        >
          {user.email[0].toUpperCase()}
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'home' && (
          <DashboardView
            th={th}
            t={t}
            expenses={expenses}
            currency={settings.currency}
          />
        )}
        {tab === 'add' && (
          <AddView th={th} t={t} currency={settings.currency} onAdd={onAdd} />
        )}
        {tab === 'history' && (
          <HistoryView
            th={th}
            t={t}
            expenses={expenses}
            currency={settings.currency}
            onDelete={onDelete}
          />
        )}
        {tab === 'reports' && (
          <ReportsView
            th={th}
            t={t}
            expenses={expenses}
            currency={settings.currency}
          />
        )}
        {tab === 'settings' && (
          <SettingsView
            th={th}
            t={t}
            settings={settings}
            user={user}
            expenses={expenses}
            onUpdate={onUpdateSettings}
            onLogout={onLogout}
          />
        )}
      </div>

      <BottomNav th={th} t={t} tab={tab} setTab={setTab} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [settings, setSettings] = useState({
    theme: 'dark',
    lang: 'en',
    currency: 'INR',
  });

  useEffect(() => {
    const t = setTimeout(() => setScreen('auth'), 2600);
    return () => clearTimeout(t);
  }, []);

  const login = async (email, pw) => {
    const users = (await sGet('et_users')) || [];
    const u = users.find((u) => u.email === email && u.pwHash === hashPw(pw));
    if (!u) return 'Invalid email or password';
    const data = (await sGet(`et_data_${u.id}`)) || {
      expenses: [],
      settings: { theme: 'dark', lang: 'en', currency: 'INR' },
    };
    setUser(u);
    setExpenses(data.expenses || []);
    setSettings(
      data.settings || { theme: 'dark', lang: 'en', currency: 'INR' }
    );
    setScreen('main');
    return null;
  };

  const signup = async (email, pw) => {
    const users = (await sGet('et_users')) || [];
    if (users.find((u) => u.email === email)) return 'Email already registered';
    const u = { id: genId(), email, pwHash: hashPw(pw) };
    await sSet('et_users', [...users, u]);
    const defS = { theme: 'dark', lang: 'en', currency: 'INR' };
    await sSet(`et_data_${u.id}`, { expenses: [], settings: defS });
    setUser(u);
    setExpenses([]);
    setSettings(defS);
    setScreen('main');
    return null;
  };

  const logout = () => {
    setUser(null);
    setExpenses([]);
    setScreen('auth');
  };

  const saveData = useCallback(
    async (exp, sett) => {
      if (!user) return;
      await sSet(`et_data_${user.id}`, { expenses: exp, settings: sett });
    },
    [user]
  );

  const addExpense = async (exp) => {
    const next = [exp, ...expenses];
    setExpenses(next);
    await saveData(next, settings);
  };

  const deleteExpense = async (id) => {
    const next = expenses.filter((e) => e.id !== id);
    setExpenses(next);
    await saveData(next, settings);
  };

  const updateSettings = async (newS) => {
    setSettings(newS);
    await saveData(expenses, newS);
  };

  const th = TV[settings.theme] || TV.dark;
  const t = T[settings.lang] || T.en;

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: 690,
        overflow: 'hidden',
        background: th.bg,
        borderRadius: 24,
      }}
    >
      {screen === 'splash' && <SplashScreen th={th} />}
      {screen === 'auth' && (
        <AuthScreen th={th} onLogin={login} onSignup={signup} />
      )}
      {screen === 'main' && (
        <MainApp
          th={th}
          t={t}
          expenses={expenses}
          settings={settings}
          user={user}
          onAdd={addExpense}
          onDelete={deleteExpense}
          onUpdateSettings={updateSettings}
          onLogout={logout}
        />
      )}
    </div>
  );
}
