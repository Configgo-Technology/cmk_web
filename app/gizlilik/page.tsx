import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Gizlilik" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Gizlilik" crumbsLabel="Gizlilik">
      <p>
        CMK Holding olarak web sitemizi ziyaret ettiğinizde paylaştığınız kişisel verileri, yürürlükteki mevzuata
        uygun şekilde ve yalnızca hizmetlerimizi sunmak, taleplerinizi yanıtlamak ve site güvenliğini sağlamak
        amacıyla işleriz.
      </p>
      <p>
        Formlar üzerinden ilettiğiniz ad, e-posta, telefon ve proje tercihi bilgileri, talebinizin
        değerlendirilmesi için gerekli süre boyunca saklanır ve yetkisiz üçüncü kişilerle paylaşılmaz.
      </p>
      <p>
        Detaylı bilgilendirme için KVKK aydınlatma metnimizi inceleyebilir, sorularınız için{" "}
        <a className="text-gold" href="mailto:info@cmk.com.tr">
          info@cmk.com.tr
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
    </LegalPage>
  );
}
