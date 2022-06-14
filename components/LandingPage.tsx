import { Container, Space, Button } from '@mantine/core'
import RoundPaper from '../components/RoundPaper'
import Link from 'next/link'
import CapacityGraph from './CapacityGraph'

export default function LandingPage() {
    const mainContent = () => {
        return (
            <div className="landing">
                <div className="landing__title">Welcome!</div>
                <p className="landing__desc">
                    {' '}
                    Let us help you find good study spaces.
                </p>
                <div className="landing__button">
                    <Link href="/studyspaces">
                        <Button
                            color="yellow"
                            radius="xl"
                            size="xl"
                            variant="filled"
                        >
                            <p className="landing__desc">Let's go!</p>
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Space h="xl" />
            <Container size="xs">
                <RoundPaper content={mainContent()} />
            </Container>
            <Space h="xl" />
        </div>
    )
}
