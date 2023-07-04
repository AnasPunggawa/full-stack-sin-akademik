import RadioButton from '../../../components/form/RadioButton';

const RADIO_BUTTON = [
  {
    name: 'role',
    htmlFor: 'semua',
  },
  {
    name: 'role',
    htmlFor: 'admin',
  },
  {
    name: 'role',
    htmlFor: 'guru',
  },
  {
    name: 'role',
    htmlFor: 'siswa',
  },
];

function ContainerRadioButton() {
  return (
    <div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
          {RADIO_BUTTON.map((item) => (
            <RadioButton
              key={item.name}
              HtmlFor={item.htmlFor}
              Name={item.name}
            >
              {item.htmlFor.charAt(0).toUpperCase() + item.htmlFor.slice(1)}
            </RadioButton>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default ContainerRadioButton;
