import * as t from '@composite/types';

import { Box } from '@app/components/box';
import { Button, IconButton } from '@app/components/button';
import { Text } from '@app/components/text';
import { useEditor } from '@app/editor';
import {
  Component1Icon,
  ComponentBooleanIcon,
  ComponentPlaceholderIcon,
} from '@radix-ui/react-icons';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { SettingSection } from '../SettingSection';
import { Tooltip } from '@app/components/tooltip';

export const ComponentSettings = observer(() => {
  const editor = useEditor();

  return (
    <SettingSection
      title="Components"
      onAdd={() => {
        // TODO: add UI to create a new component
      }}
    >
      <Box
        css={{
          ml: '-$3',
          mr: '-$3',
        }}
      >
        {editor.state.allComponents.map((component) => (
          <Box
            css={{
              py: '$2',
              px: '$3',

              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              svg: {
                width: '12px',
                height: '12px',
                mr: '$3',
              },
              [`& ${Button}`]: {
                opacity: 0,
              },
              '&:hover': {
                backgroundColor: '$purple3',
                [`& ${Button}`]: {
                  opacity: 1,
                },
              },
            }}
          >
            {component instanceof t.CompositeComponent ? (
              <ComponentBooleanIcon />
            ) : (
              <ComponentPlaceholderIcon />
            )}
            <Text size="2" css={{ flex: 1, color: 'rgba(0,0,0,0.8)' }}>
              {component.name}
            </Text>
            <Tooltip
              content={
                component instanceof t.CompositeComponent
                  ? ''
                  : 'This is an external component, we cannot edit it'
              }
            >
              <Button
                css={{
                  cursor:
                    component instanceof t.CompositeComponent
                      ? 'auto'
                      : 'not-allowed',
                }}
              >
                Edit Component
              </Button>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </SettingSection>
  );
});