import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import type { Route } from './+types/account';
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

export async function loader({ context }: Route.LoaderArgs) {
  const { customerAccount } = context;
  const { data, errors } = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    { customer: data.customer },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const { customer } = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';



  console.log(`%c${JSON.stringify(customer)}`, 'color: red; font-size: 20px;')



  return (
    <div>
      <div className='flex flex-col gap-3'>
        <h2 className='font-medium'>{heading}</h2>
        <br />
        <AccountMenu />
        <br />
        <br />
        <Outlet context={{ customer }} />
      </div>
    </div>
  );
}

function AccountMenu() {
  function isActiveClass({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return `px-3 py-1 rounded-full ${isActive ? 'ACTIVE_TAB' : 'TAB'
      } ${isPending ? 'text-gray-500 underline' : 'text-black'}`;
  }

  return (
    <nav role="navigation" className='flex flex-row gap-5 items-center justify-between'>
      <span className='flex flex-row flex-wrap gap-5'>
        <NavLink to="/account/orders" className={isActiveClass}>
          Orders
        </NavLink>

        <NavLink to="/account/profile" className={isActiveClass}>
          Profile
        </NavLink>

        <NavLink to="/account/addresses" className={isActiveClass}>
          Addresses
        </NavLink>
      </span>

      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button type="submit" className='BUTTON2'>Sign out</button>
    </Form>
  );
}
