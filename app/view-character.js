//
//	Character
//


class Character {


}/* Character */




/** @returns {string} */
export function getBarrySVG() {
	const result = `
		<g id="character-barry" class="character barry character-hover">
			<g class="body">
				<circle class="tl"/>
				<circle class="tr"/>
				<circle class="bl"/>
				<circle class="br"/>
			</g>
			<g class="eyes">
				<!-- <circle class="el"/>
				<circle class="er"/> -->

				<path d="m -3,-3 a 6,11 0 1 0 -22,0 z"/>
				<path d="m +3,-3 a 6,11 0 1 1 +22,0 z"/>
			</g>
		</g>
	`;

	return result;
}