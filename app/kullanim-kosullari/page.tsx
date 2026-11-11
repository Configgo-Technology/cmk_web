import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Kullanım Koşulları" };

export default function TermsPage() {
  return (
    <LegalPage title="Kullanım Koşulları" crumbsLabel="Şartlar">
      <p>
        Bu web sitesini kullanarak CMK Holding&apos;in sunduğu bilgilendirme içeriklerine erişirsiniz. Sitedeki
        metin, görsel ve proje bilgileri genel tanıtım amaçlıdır; bağlayıcı teklif niteliği taşımaz.
      </p>
      <p>
        İçeriklerin izinsiz kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır. Site üzerinden
        yapılan başvurularda doğru ve güncel bilgi vermeniz gerekir.
      </p>
      <p>
        CMK Holding, site içeriğini önceden bildirmeksizin güncelleme hakkını saklı tutar. Uyuşmazlıklarda Türkiye
        Cumhuriyeti hukuku ve Ankara mahkemeleri yetkilidir.
      </p>
    </LegalPage>
  );
}
