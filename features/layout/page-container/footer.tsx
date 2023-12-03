import Data from "../../../package.json";
import {Button} from "@features/ui/button";
import Link from "next/link";
import styles from "./footer.module.scss";

const DataVersion = Data.version;

 function Footer(){
	return (
		<div className={styles.applicationFooter}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.footerVersion}>
							Version {DataVersion}
					</div>
						<div className={styles.footerLinks}>
							<Button className={styles.footerButt}>
								<Link href='#' className={styles.footerButttwo}>Docs</Link>
							</Button>
							<Button className={styles.footerButt}>
								<Link href='#' className={styles.footerButttwo}>API</Link>
							</Button>
							<Button className={styles.footerButt}>
								<Link href='#' className={styles.footerButttwo}>Help</Link>
							</Button>
							<Button className={styles.footerButt}>
								<Link href='#' className={styles.footerButttwo}>Community</Link>
							</Button>
						</div>
						<div className={styles.footerLogoWrap}>
							<img	src={`/icons/logo-small.svg`} />
						</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;