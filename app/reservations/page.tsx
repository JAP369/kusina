import NavBar from '../../components/NavBar';
// import Footer from '../../components/Footer';
import ReservationForm from '../../components/ReservationForm';

export default function ReservationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <ReservationForm />
      {/* <Footer /> */}
    </div>
  );
}