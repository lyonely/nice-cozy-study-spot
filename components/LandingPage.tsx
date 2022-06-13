import { Container, Space, Button } from '@mantine/core';
import RoundPaper from '../components/RoundPaper'
import Link from 'next/link'
import TopBar from './TopBar';

export default function LandingPage() {

    const mainContent = () => {
        return (
            <div className="landing">
                <div className="landing__title">Welcome!</div>
                <p> Let us help you find good study spaces.</p>
                <div className="landing-button">
                    <Link href="/studyspaces">
                    <Button color="yellow" radius="xl" size="xl" >
                        Let's go!
                    </Button>
                    </Link>
                </div>
			</div>
        );
    }
    
    return (
        <div className="bg">
            <TopBar />

            <Space h="xl"/>
            <Container size="xs">
                <RoundPaper content={mainContent()} />
            </Container>
            <Space h="xl"/>
        </div>
    );
}