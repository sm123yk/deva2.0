import "./App.css";
import Result from "./component/Result";
import CandidateCard from "./component/CandidateCard";
function App() {
	return (
		<>
			<div className="container">
				<figure className="text-center">
					<blockquote className="blockquote">
						<p className="display-3">Decentralized E Voting Application</p>
					</blockquote>
					<figcaption className="blockquote-footer">
						Powered By <cite title="Source Title">Blockchain</cite>
					</figcaption>
				</figure>
				<br />
				<br />
			</div>
			<div className="d-flex w-100 justify-content-center">
				<CandidateCard />
			</div>
			<div className="container">
				<Result />
			</div>
		</>
	)
}
export default App;
