import { Box, Space, ActionIcon, Center} from '@mantine/core'
import { MapPin } from 'react-feather';
import Link from 'next/link'
import { createStyles } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';


export default function TopBar() {
    const { height, width } = useViewportSize();

    const useStyles = createStyles((theme) => ({
        container: {
          width: 500,
      
          // Media query with value from theme
          [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            width: width
          },
      
        },
      }));
      
    const { classes } = useStyles();

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className={classes.container}>
                <Box px="xs" sx={(theme) => ({
                    backgroundColor: theme.colors.brown[0],
                })}>
                    <Space h="xs" />
                    <Link href="https://mantine.dev/core/action-icon/">
                        <MapPin />
                    </Link>
                    <Space h="xs" />
                </Box>
            </div>
        </div>
    );
}