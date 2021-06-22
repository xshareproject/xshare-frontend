export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
  Splash: undefined;
  Register: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type GlobalContextType = {
  authToken: string | undefined;
  login: () => void;
};
