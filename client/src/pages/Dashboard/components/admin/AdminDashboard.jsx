import Container from '../Container';
import Header from '../Header';
import DashboardCardsInfo from './DashboardCardsInfo';
import DashboardHeader from './DashboardHeader';

function AdminDashboard() {
  return (
    <>
      <Header>Dashboard</Header>
      <Container>
        <div className="w-full p-4 space-y-4">
          <DashboardHeader />
          <div className="w-full grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3">
            <DashboardCardsInfo />
          </div>
          <div className="w-full">
            <h3>Informasi Sekolah</h3>
            <div>Tabel Informasi</div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
