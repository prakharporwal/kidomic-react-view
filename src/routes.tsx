import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import WebHeader from "./components/WebHeader";

/** LAZY IMPORT PAGES COMPONENTS */
const Homepage = lazy(
  () => import(/* webpackChunkName: "homepage" */ "./pages/Homepage")
);

const StoryViewPage = lazy(
  () => import(/* webpackChunkName: "storyView" */ "./pages/StoryViewPage")
);

const AppPlayerLayout = lazy(
  () =>
    import(
      /* webpackChunkName: "appPlayerLayout" */ "./components/AppPlayerLayout"
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
const FacebookPage = lazy(
  () => import(/* webpackChunkName: "facebookPage" */ "./pages/FacebookPage")
);
const DashboardPage = lazy(
  () =>
    import(/* webpackChunkName: "dashboardPage" */ "./pages/AppDashboardPage")
);
const LinkedPostForm = lazy(
  () => import(/* webpackChunkName: "postForm" */ "./components/PostForm")
);
const PostingHistoryList = lazy(
  /* webpackChunkName: "postingHistory" */
  () => import("./components/PostingHistoryList")
);
const TwitterPage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/TwitterPage")
);
const InstagramPage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/InstagramPage")
);
const YoutubePage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/YoutubePage")
);
const LinkedinPage = lazy(
  () => import(/* webpackChunkName: "linkedinPage" */ "./pages/LinkedinPage")
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
    path: "/",
    element: <AppPlayerLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/story/:storyId",
        element: <StoryViewPage />,
      },
    ],
  },
  {
    path: "/",
    element: <WebHeader />,
    children: [
      {
        path: "/forgot-password",
        element: <ForgotPasswordRequestPage />,
      },
      {
        path: "/forgot-password-reset",
        element: <ForgotPasswordResetPage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
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
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "post/new",
        element: <LinkedPostForm />,
      },
      {
        path: "twitter",
        element: <TwitterPage />,
      },
      {
        path: "instagram",
        element: <InstagramPage />,
      },
      {
        path: "youtube",
        element: <YoutubePage />,
      },
      {
        path: "facebook",
        element: <FacebookPage />,
      },
      {
        path: "linkedin",
        element: <LinkedinPage />,
      },
    ],
  },
]);
