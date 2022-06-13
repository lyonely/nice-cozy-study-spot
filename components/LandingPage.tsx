import { Container, Space } from '@mantine/core';
import RoundPaper from '../components/RoundPaper'
import Link from 'next/link'
import TopBar from './TopBar';

export default function LandingPage() {

    const mainContent = () => {
        return (
            <div className="landing">
                <div className="landing__title">Welcome!</div>
                <p> Let us help you find good study spaces.</p>
                <div>
                    <Link href="/studyspaces">
                        <a className="landing_proceed">Lets go</a>
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