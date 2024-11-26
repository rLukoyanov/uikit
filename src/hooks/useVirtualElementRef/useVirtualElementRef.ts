import * as React from 'react';

import type {VirtualElement} from '@floating-ui/react';

export type VirtualElementRect = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};

export interface UseVirtualElementRefProps {
    /**
     * Position of virtual element relative to viewport
     */
    rect?: VirtualElementRect | null;

    /**
     * DOM-context of virtual element
     */
    contextElement?: Element;
}

export type UseVirtualElementRefResult = React.MutableRefObject<VirtualElement>;

const initialPosition = {top: 0, right: 0, bottom: 0, left: 0};

// React hook for creating virtual element for popup
export function useVirtualElementRef(
    props: UseVirtualElementRefProps = {},
): UseVirtualElementRefResult {
    const {rect, contextElement} = props;
    const rectRef = React.useRef(initialPosition);

    const ref = React.useRef<VirtualElement>({
        contextElement,
        getBoundingClientRect() {
            const {top, right, bottom, left} = rectRef.current;
            const width = right - left;
            const height = bottom - top;

            return {
                top,
                right,
                bottom,
                left,
                width,
                height,
            } as DOMRect;
        },
    });

    ref.current.contextElement = contextElement;

    if (rect) {
        const {top = 0, left = 0, right = left, bottom = top} = rect;

        rectRef.current = {top, right, bottom, left};
    } else {
        rectRef.current = initialPosition;
    }

    return ref;
}
