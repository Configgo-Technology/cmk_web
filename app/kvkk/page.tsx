import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni" };

export default function KvkkPage() {
  return (
    <LegalPage title="KVKK Aydınlatma Metni" crumbsLabel="KVKK">
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu CMK Holding&apos;dir. İletişim
        formunda paylaştığınız kimlik ve iletişim verileriniz; başvuru süreçlerinin yürütülmesi, sizinle iletişime
        geçilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir.
      </p>
      <p>
        Verileriniz, talebinizin niteliğine göre CRM sistemlerimize aktarılabilir ve yalnızca bu amaçla sınırlı
        olarak saklanır. Kanundan doğan haklarınızı kullanmak için{" "}
        <a className="text-gold" href="mailto:info@cmk.com.tr">
          info@cmk.com.tr
        </a>{" "}
        adresine başvurabilirsiniz.
      </p>
    </LegalPage>
  );
}
