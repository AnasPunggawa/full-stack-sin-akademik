import Container from '../Container';
import Header from '../Header';
import DashboardCardsInfo from './DashboardCardsInfo';
import DashboardHeader from './DashboardHeader';
import DashboardInfoSekolah from './DashboardInfoSekolah';

function AdminDashboard() {
  return (
    <>
      <Header>Dashboard</Header>
      <Container>
        <div className="w-full p-4 space-y-4">
          <DashboardHeader />
          <DashboardCardsInfo ClassName="w-full grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3" />
          <DashboardInfoSekolah />
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
