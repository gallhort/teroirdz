import Header from "@/components/layout/Header";
import HomeTerroir from "@/components/home/demos/HomeTerroir";
import HomeEpicerie from "@/components/home/demos/HomeEpicerie";
import HomeArtisan from "@/components/home/demos/HomeArtisan";
import HomeMaison from "@/components/home/demos/HomeMaison";
import HomeDucsGascogne from "@/components/home/demos/HomeDucsGascogne";
import HomeMaisonVerot from "@/components/home/demos/HomeMaisonVerot";
import HomeTeteLard from "@/components/home/demos/HomeTeteLard";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const { demo } = await searchParams;

  return (
    <>
      <Header />
      <main>
        {demo === "epicerie" && <HomeEpicerie />}
        {demo === "artisan" && <HomeArtisan />}
        {demo === "maison" && <HomeMaison />}
        {demo === "ducs" && <HomeDucsGascogne />}
        {demo === "verot" && <HomeMaisonVerot />}
        {demo === "tetedelard" && <HomeTeteLard />}
        {(!demo || demo === "terroir") && <HomeTerroir />}
      </main>
    </>
  );
}
