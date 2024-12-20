import {PropsWithChildren} from 'react';

const List = ({children}: PropsWithChildren) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
    lg:grid-cols-4 xl:grid-cols-5 gap-lg">
      {children}
    </div>
  );
};

export default List;
