// page.tsx - Halaman ini bisa mengekspor metadata karena bukan komponen client-side
export const metadata = {
  title: 'CCED',
  description: 'Dibuat oleh CCED',
};
import { currentUser } from '@/lib/authenticate'


import { getUsersWithBerkas } from '@/actions/admin-action';
import UsersControl from '@/components/admin/user-control-admin';
import RoleGate from '@/components/auth/role-gate';
import { Role } from '@prisma/client';

export default async function Page() {
  const users = await getUsersWithBerkas();
  const authenticatedUser = await currentUser();
  return (
    <RoleGate accessRole={Role.ADMIN}>
     <UsersControl users={users || []} authenticatedUser={authenticatedUser} />
    </RoleGate>
  );
}
