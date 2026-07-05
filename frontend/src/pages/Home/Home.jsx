import Navbar from "../../components/layout/Navbar";
import BottomNavigation from "../../components/layout/BottomNavigation";
import PageLayout from "../../components/layout/PageLayout";
import LiveMatchesSection from "../../components/match/LiveMatchesSection";

const Home = () => {
  return (
    <PageLayout>
      <Navbar />

      <main className="flex-1 pb-20">
        <LiveMatchesSection />
      </main>

      <BottomNavigation />
    </PageLayout>
  );
};

export default Home;