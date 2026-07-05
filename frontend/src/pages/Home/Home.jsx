import Navbar from "../../components/layout/Navbar";
import BottomNavigation from "../../components/layout/BottomNavigation";
import PageLayout from "../../components/layout/PageLayout";
import LiveMatchesSection from "../../components/match/LiveMatchesSection";

const Home = () => {
  return (
    <PageLayout>
      <Navbar />

      <main className="pb-24">
        <LiveMatchesSection />
      </main>

      <BottomNavigation />
    </PageLayout>
  );
};

export default Home;