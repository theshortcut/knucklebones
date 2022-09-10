import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { container, toast } from './ReloadPrompt.css';
import { Flex } from '../Flex';

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({});

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className={container}>
      {(offlineReady || needRefresh) && (
        <div className={toast}>
          <Text>
            {offlineReady
              ? 'App ready to work offline'
              : 'Update available, reload to update'}
          </Text>
          <Flex flexDirection="row" gap="md" justifyContent="flex-end">
            <Button variant="secondary" size="small" onClick={() => close()}>
              Close
            </Button>
            {needRefresh && (
              <Button
                variant="primary"
                onClick={() => updateServiceWorker(true)}
                size="small"
              >
                Reload
              </Button>
            )}
          </Flex>
        </div>
      )}
    </div>
  );
};
