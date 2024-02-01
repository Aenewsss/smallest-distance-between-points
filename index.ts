interface Point {
    x: number;
    y: number;
    distanceFromLastPoint?: number
}

const plusOrMinor = (): number => Math.random() < 0.5 ? -1 : 1;
const generateRandomNumber = (): number => plusOrMinor() * Math.round(Math.random() * 40) + 1;

const quantityOfPoints: number = Math.round(Math.random() * 10) + 1

const points: Point[] = Array.from({ length: quantityOfPoints }, () => (
    {
        x: generateRandomNumber(),
        y: generateRandomNumber()
    }
))

const mathFormulaToCalcDistance = (pointA: Point, pointB: Point) => Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2))

function calcSmallestDistanceBetweenPoints() {
    const path: Point[] = [{ x: 0, y: 0 }]
    const unusedPoints: Point[] = points.slice()

    while (unusedPoints.length > 0) {
        const lastPoint = path[path.length - 1]
        let nearestPoint: Point;
        let smallestDistance: number = Infinity

        for (const point of unusedPoints) {
            const distance = mathFormulaToCalcDistance(lastPoint, point)
            if (distance < smallestDistance) {
                nearestPoint = { ...point, distanceFromLastPoint: Number(distance.toFixed(2)) }
                smallestDistance = distance
            }
        }

        path.push(nearestPoint)
        unusedPoints.splice(unusedPoints.indexOf(nearestPoint), 1)
    }

    console.log('path', path)

}

calcSmallestDistanceBetweenPoints()