import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('public');

  return (
    <>
      {t('homepage.hello-world')}
    </>
  );
}
