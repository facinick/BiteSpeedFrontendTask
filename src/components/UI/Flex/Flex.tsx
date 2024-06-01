import { VariantProps, cva } from "class-variance-authority";
import classnames from "classnames";
import { forwardRef } from "react";
import styles from './Flex.module.css';

const flexVariants = cva(styles.flex, {
  variants: {
    justify: {
      normal: styles.justifyNormal,
      start: styles.justifyStart,
      end: styles.justifyEnd,
      center: styles.justifyCenter,
      between: styles.justifyBetween,
      around: styles.justifyAround,
      evenly: styles.justifyEvenly,
      stretch: styles.justifyStretch,
    },
    align: {
      start: styles.itemsStart,
      end: styles.itemsEnd,
      center: styles.itemsCenter,
      baseline: styles.itemsBaseline,
      stretch: styles.itemsStretch,
    },
    direction: {
      row: styles.flexRow,
      column: styles.flexCol,
      rowReverse: styles.flexRowReverse,
      columnReverse: styles.flexColReverse,
    },
    gap: {
      0: styles.gap0,
      1: styles.gap1,
      2: styles.gap2,
      3: styles.gap3,
      4: styles.gap4,
      5: styles.gap5,
      6: styles.gap6,
      7: styles.gap7,
      8: styles.gap8,
      9: styles.gap9,
      10: styles.gap10,
      11: styles.gap11,
      12: styles.gap12,
    },
    wrap: {
      nowrap: styles.flexNowrap,
      wrap: styles.flexWrap,
      reverse: styles.flexWrapReverse,
    },
  },
  defaultVariants: {
    justify: 'start',
    align: 'stretch',
    gap: 0,
    wrap: 'nowrap',
    direction: 'row',
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {

  }

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      justify,
      direction,
      gap,
      wrap,
      align,
      ...props
    },
    ref
  ) => {

    return (
      <div
        className={classnames(
          flexVariants({ justify, align, direction, gap, wrap, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Flex.displayName = "Flex";

export { Flex, flexVariants };
