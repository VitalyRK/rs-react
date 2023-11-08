import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { ICharacter, IPagination } from '../helpers/Types';

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

type AppProviderProps = {
  children: ReactNode;
};

interface IAppContext {
  query: string | null;
  setQuery: TypeSetState<string | null>;
  loading: boolean;
  setLoading: TypeSetState<boolean>;
  page: number;
  setPage: TypeSetState<number>;
  limit: number;
  setLimit: TypeSetState<number>;
  characters: ICharacter[] | null;
  setCharacters: TypeSetState<ICharacter[] | null>;
  paginationData: IPagination | null;
  setPaginationData: TypeSetState<IPagination | null>;
}

export const AppContext = createContext<IAppContext>({
  query: null,
  setQuery: () => {},
  loading: false,
  setLoading: () => {},
  page: 1,
  setPage: () => {},
  limit: 10,
  setLimit: () => {},
  characters: null,
  setCharacters: () => {},
  paginationData: null,
  setPaginationData: () => {},
});

export const AppProvider = (props: AppProviderProps) => {
  const [query, setQuery] = useState<string | null>(
    localStorage.getItem('LOCAL_LAST_SEARCH_QUERY')
  );

  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [paginationData, setPaginationData] = useState<IPagination | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const value = useMemo(() => {
    return {
      query,
      setQuery,
      loading,
      setLoading,
      page,
      setPage,
      limit,
      setLimit,
      characters,
      setCharacters,
      paginationData,
      setPaginationData,
    };
  }, [page, limit, query, characters]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
