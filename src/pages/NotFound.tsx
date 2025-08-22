import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      <h1 className="text-6xl font-bold text-[#14A5BA] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">{t('notFound1')}</h2>
      <p className="text-gray-500 mb-6 text-center px-4">{t('notFound2')}</p>
      <a href="/" className="px-6 py-3 bg-[#14A5BA] text-white rounded-xl shadow hover:bg-[#1190a3] transition">{t('notFound3')}</a>
    </div>
  );
}

export default NotFound;