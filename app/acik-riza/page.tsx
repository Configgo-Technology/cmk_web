import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Açık Rıza Metni" };

export default function ConsentPage() {
  return (
    <LegalPage title="Açık Rıza Metni" crumbsLabel="Açık Rıza">
      <p>
        İletişim formunu göndererek, paylaştığınız kişisel verilerinizin talebinizin değerlendirilmesi ve sizinle
        iletişime geçilmesi amacıyla CMK Holding tarafından işlenmesine açık rıza verdiğinizi beyan edersiniz.
      </p>
      <p>
        Ticari elektronik ileti kutusu ayrı bir tercihtir; işaretlemediğiniz sürece pazarlama iletişimi amacıyla
        kullanılmaz. Rızanızı istediğiniz zaman geri alabilirsiniz.
      </p>
    </LegalPage>
  );
}
