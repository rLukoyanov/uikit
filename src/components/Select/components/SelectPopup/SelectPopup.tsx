'use client';

import * as React from 'react';

import {Popup} from '../../../Popup';
import type {PopupPlacement} from '../../../Popup';
import {Sheet} from '../../../Sheet';
import {block} from '../../../utils/cn';
import {SelectQa} from '../../constants';

import {getMiddlewares} from './middlewares';
import type {SelectPopupProps} from './types';

import './SelectPopup.scss';

const b = block('select-popup');

const DEFAULT_PLACEMENT: PopupPlacement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];

export const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
    (
        {
            handleClose,
            onAfterClose,
            width,
            open,
            placement = DEFAULT_PLACEMENT,
            controlRef,
            children,
            className,
            disablePortal,
            virtualized,
            mobile,
            id,
        },
        ref,
    ) =>
        mobile ? (
            <Sheet
                qa={SelectQa.SHEET}
                className={className}
                visible={Boolean(open)}
                onClose={handleClose}
            >
                {children}
            </Sheet>
        ) : (
            <Popup
                contentClassName={b(null, className)}
                qa={SelectQa.POPUP}
                anchorRef={ref as React.RefObject<HTMLDivElement>}
                placement={placement}
                open={open}
                onClose={handleClose}
                disablePortal={disablePortal}
                restoreFocus
                restoreFocusRef={controlRef}
                middlewares={getMiddlewares({width, disablePortal, virtualized})}
                id={id}
                onTransitionExited={onAfterClose}
            >
                {children}
            </Popup>
        ),
);

SelectPopup.displayName = 'SelectPopup';
