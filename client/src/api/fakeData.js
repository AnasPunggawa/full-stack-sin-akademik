const user = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    role: 'admin',
  },
  {
    id: 2,
    username: 'guru',
    password: 'guru',
    role: 'guru',
  },
  {
    id: 3,
    username: 'siswa',
    password: 'siswa',
    role: 'siswa',
  },
];

export function getUser() {
  return user;
}
