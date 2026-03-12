import type { MDXComponents } from 'mdx/types';
import {
  Table,
  CustomLink,
  RoundedImage,
  Callout,
  ProsCard,
  ConsCard,
  Code,
  createHeading,
  LiveCode,
} from 'app/components/mdx';
import { TweetComponent } from 'app/components/tweet';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    Callout,
    ProsCard,
    ConsCard,
    StaticTweet: TweetComponent,
    code: Code,
    Table,
    LiveCode,
    ...components,
  };
}
