LIBS NECESSARIAS:

yarn add axios

yarn add @reduxjs/toolkit

yarn add react-redux

yarn add redux-persist

yarn add @react-native-async-storage/async-storage

yarn add redux-persist

CHAMAR NO INDEX DE ALGUMA PAGINA:

const dispatch = useAppDispatch();

const onLogin: (params: LoginFormType) => void = async (params) => {
await dispatch(loginAction(params));
};

const { status } = useAppSelector((state: RootState) => state.authReducer);

CARREGAR AUTOMATICAMENTE AO INICIAR A PAGINA:

useEffect(() => {
await dispatch(loginAction(params));
})
