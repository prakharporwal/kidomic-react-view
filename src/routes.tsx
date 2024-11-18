import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

/** LAZY IMPORT PAGES COMPONENTS */
const HomePage = lazy(
  () => import(/* webpackChunkName: "homePage" */ "./pages/HomePage")
);

const VideoViewPage = lazy(
  () => import(/* webpackChunkName: "videoViewPage" */ "./pages/VideoViewPage")
);

const StorySeriesViewPage = lazy(
  () =>
    import(
      /* webpackChunkName: "storySeriesViewPage" */ "./pages/StorySeriesViewPage"
    )
);

const WebHeader = lazy(
  () =>
    import(/* webpackChunkName: "webHeader" */ "./components/common/WebHeader")
);

const AppPlayerLayout = lazy(
  () =>
    import(
      /* webpackChunkName: "appPlayerLayout" */ "./pages/layouts/AppPlayerLayout"
    )
);

const AuthPageLayout = lazy(
  () =>
    import(
      /* webpackChunkName: "authPlayerLayout" */ "./pages/layouts/AuthPageLayout"
    )
);

const SidebarWithHeader = lazy(
  () =>
    import(
      /* webpackChunkName: "SidebarWithHeader" */ "./components/SimpleSidebarWithHeader"
    )
);

const ForgotPasswordResetPage = lazy(
  () =>
    import(
      /* webpackChunkName: "forgotPasswordResetPage" */ "./pages/ForgotPasswordResetPage"
    )
);
const ForgotPasswordRequestPage = lazy(
  () =>
    import(
      /* webpackChunkName: "forgotPasswordRequest" */ "./pages/ForgotPasswordPage"
    )
);
const MarketingPage = lazy(
  () => import(/* webpackChunkName: "marketing" */ "./pages/MarketingPage")
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "notFoundPage" */ "./pages/NotFoundPage")
);

const LinkedPostForm = lazy(
  () => import(/* webpackChunkName: "postForm" */ "./components/PostForm")
);
const PostingHistoryList = lazy(
  /* webpackChunkName: "postingHistory" */
  () => import("./components/PostingHistoryList")
);

const SignInPage = lazy(
  () => import(/* webpackChunkName: "signinPage" */ "./pages/SignInPage")
);
const SignUpPage = lazy(
  () => import(/* webpackChunkName: "signUpPage" */ "./pages/SignUpPage")
);

const ShortsFeedPage = lazy(
  () => import(/* webpackChunkName: "signUpPage" */ "./pages/ShortsFeedPage")
);

export const routeNames = {
  rootPath: "/app",
  protectedPath: "/admin",
};

export const appRouter = createBrowserRouter([
  {
    path: "/shorts/:videoId",
    element: <ShortsFeedPage />,
  },
  {
    path: "/user",
    element: <AuthPageLayout />,
    children: [
      {
        path: "forgot-password",
        element: <ForgotPasswordRequestPage />,
      },
      {
        path: "forgot-password-reset",
        element: <ForgotPasswordResetPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AppPlayerLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "video/:videoId",
        element: <VideoViewPage />,
      },
      {
        path: "story/:storyId",
        element: <StorySeriesViewPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: routeNames.rootPath,
    element: <SidebarWithHeader />,
    children: [
      {
        path: "home",
        element: <PostingHistoryList />,
      },
      {
        path: "post/new",
        element: <LinkedPostForm />,
      },
    ],
  },
]);
