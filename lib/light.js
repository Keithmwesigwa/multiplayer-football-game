import * as THREE from 'three'

export class Light extends THREE.PointLight {
    constructor(lightID) {
        super (0xffffff, 1, 50);
        this.position.set( 0, 0, 5 );
        this.name = lightID;
        this.lamb = 14
    }

    computeLimits(bbox) {
        let min, max, mid, l;
        let char = 'x';
        let limits = [];
        while(char != '{') {
            let lim = [];
            l = (bbox.max[char] - bbox.min[char]) * 1.25;
            mid = (bbox.max[char] + bbox.min[char]) * 0.5;
            min = mid - (l/2);
            max = mid + (l/2);
    
            lim.push(min); lim.push(max)
            limits.push(lim)
            char = String.fromCharCode(char.charCodeAt(0) + 1)
        }
        return limits;
    }
}