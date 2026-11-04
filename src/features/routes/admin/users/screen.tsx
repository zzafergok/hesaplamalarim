import { Badge } from '@/components/core/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/core/table';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAdminUsersCopy } from './i18n';

export async function AdminUsersScreen() {
  const locale = await getCurrentLocale();
  const copy = getAdminUsersCopy(locale);

  return (
    <Card className="border-gunmetal bg-obsidian">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-widest">
          {copy.cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gunmetal/60 hover:bg-transparent">
              <TableHead className="font-mono text-xs uppercase text-ash">
                {copy.columns.name}
              </TableHead>
              <TableHead className="font-mono text-xs uppercase text-ash">
                {copy.columns.role}
              </TableHead>
              <TableHead className="text-right font-mono text-xs uppercase text-ash">
                {copy.columns.status}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {copy.users.map((user) => (
              <TableRow key={user.name} className="border-gunmetal/40">
                <TableCell className="font-semibold text-titanium">
                  {user.name}
                </TableCell>
                <TableCell className="text-ash">{user.role}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className="w-fit rounded-none border-tulpar-blue/30 bg-tulpar-blue/10 text-tulpar-blue"
                    variant="none"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
