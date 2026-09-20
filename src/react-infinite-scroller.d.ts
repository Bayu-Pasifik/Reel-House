declare module "react-infinite-scroller" {
  import type { ComponentType, ReactNode } from "react";

  type InfiniteScrollProps = {
    children?: ReactNode;
    pageStart?: number;
    loadMore: (page: number) => void;
    hasMore?: boolean;
    initialLoad?: boolean;
    useWindow?: boolean;
    getScrollParent?: () => HTMLElement | null;
  };

  const InfiniteScroll: ComponentType<InfiniteScrollProps>;
  export default InfiniteScroll;
}
