import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

const About = () => {
    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">About EchoPost</h1>

                <div className="mb-8 bg-white shadow rounded p-6 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    <h2 className="text-2xl font-semibold mb-2">Welcome to EchoPost</h2>
                    <p>
                        Your go-to platform for exploring the latest in technology, career insights, and vibrant discussions on programming, networking, and beyond.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { title: "Empower", description: "Provide a space for tech enthusiasts, professionals, and learners to share knowledge and inspire growth." },
                            { title: "Connect", description: "Foster a community where ideas and expertise come together to spark innovation." },
                            { title: "Grow", description: "Support our users in staying ahead with industry trends and advancing their careers." }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white shadow rounded p-4 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            >
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">What We Offer</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
                        <li>Latest Tech Updates: Stay informed with posts about cutting-edge technologies and industry advancements.</li>
                        <li>Career Insights: Discover career advice, interview tips, and pathways to success in the tech world.</li>
                        <li>Discussion Forums: Join conversations about programming challenges, networking solutions, and other tech topics.</li>
                        <li>User Contributions: Share your thoughts, projects, and expertise with a like-minded community.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Why Join Us?</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { title: "Community-Driven", description: "Whether you're a beginner or an expert, our platform is designed for collaboration and learning." },
                            { title: "Diverse Topics", description: "From AI and cybersecurity to software development and IT infrastructure, there's something for everyone." },
                            { title: "Easy to Use", description: "Post, comment, and connect effortlessly through our user-friendly interface." }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white shadow rounded p-4 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            >
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Get Involved</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
                        <li>Start Posting: Share your experiences, insights, or questions.</li>
                        <li>Engage: Comment on posts, participate in discussions, and network with other users.</li>
                        <li>Learn: Explore content tailored to your interests and career goals.</li>
                    </ul>
                </section>

                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Join EchoPost Today!</h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        Be part of a dynamic community that's shaping the future of technology!
                    </p>
                    <Link href="/register">
                        <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition">
                            Register Now
                        </a>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default About;
