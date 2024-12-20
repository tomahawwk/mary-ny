import {PropsWithChildren} from 'react';

const BaseLayout = ({children}: PropsWithChildren) => {
  return (
    <main className="w-screen wrapper grid gap-md pb-xl overflow-hidden">
      <section>{children}</section>
    </main>
  );
};

export default BaseLayout;
