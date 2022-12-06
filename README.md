LIBS NECESSARIAS:

yarn add axios

yarn add @reduxjs/toolkit

yarn add react-redux

yarn add redux-persist

yarn add @react-native-async-storage/async-storage

CHAMAR NO INDEX DE ALGUMA PAGINA:

const dispatch = useAppDispatch();

const nomeFunção: (params: TipoDoParam) => void = async (params) => {
await dispatch(funçãoDoRedux(params));
};

const { variavel } = useAppSelector((state: RootState) => state.nomeReducer);

CARREGAR AUTOMATICAMENTE AO INICIAR A PAGINA:

useEffect(() => {
await dispatch(nomeFunção(params));
})
