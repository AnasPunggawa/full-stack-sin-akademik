import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Container from '../components/Container';
import Button from '../../../components/ui/Button';
import { IconChevronLeft } from '../../../components/ui/Icons';

function DetailGuru() {
  const { id } = useParams();

  const navigate = useNavigate();
  function handleKembali() {
    navigate('/guru');
  }

  function handleEdit() {
    console.log('go to edit page');
  }

  return (
    <>
      <Header>Guru Nama {id}</Header>
      <Container>
        <div className="w-full px-4 pt-4">
          <div className="w-full flex flex-wrap justify-between pb-1 border-b-2 border-gray-300 dark:border-gray-500">
            <Button
              OnClick={() => handleKembali()}
              ButtonStyle="LINK_SECONDARY"
            >
              <div className="flex items-center gap-1">
                <IconChevronLeft /> Kembali
              </div>
            </Button>
            <div className="flex gap-2 sm:gap-4">
              <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
                Edit
              </Button>
              <Button OnClick={() => handleEdit()} ButtonStyle="LINK_DANGER">
                Delete
              </Button>
              {/* <DeleteMataPelajaran MataPelajaran={detailMataPelajaran.data} /> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default DetailGuru;
