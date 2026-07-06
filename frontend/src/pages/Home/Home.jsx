import Navbar from "../../components/layout/Navbar";
import BottomNavigation from "../../components/layout/BottomNavigation";
import PageLayout from "../../components/layout/PageLayout";

import SportsTabs from "../../components/ui/SportsTabs";
import LeagueCarousel from "../../components/league/LeagueCarousel";
import DateTabs from "../../components/ui/DateTabs";

import LiveMatchesSection from "../../components/match/LiveMatchesSection";

const Home = () => {
  return (
    <PageLayout>
      <Navbar />

      <main className="pb-24">
        <SportsTabs />

        <LeagueCarousel />

        <LiveMatchesSection />

        <DateTabs />
      </main>

      <BottomNavigation />
    </PageLayout>
  );
};

export default Home;