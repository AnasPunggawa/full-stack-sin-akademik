import { getDateNow } from '../../../../../utils/getDateNow';

function PageFooter() {
  const dateNow = getDateNow();
  return (
    <div className="w-full flex flex-col items-end">
      <div className="pr-10">
        <p className="text-sm">Jeneponto, {dateNow}</p>
        <p className="text-sm mb-16">Sekolah, </p>
        <p className="text-sm">UPT SMP Negeri 1 Binamu</p>
      </div>
    </div>
  );
}

export default PageFooter;
